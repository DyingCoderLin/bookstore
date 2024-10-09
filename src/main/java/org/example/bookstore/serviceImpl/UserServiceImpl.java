package org.example.bookstore.serviceImpl;

import jakarta.servlet.http.HttpSession;
import org.example.bookstore.controllers.UserController;
import org.example.bookstore.dao.UserAuthDao;
import org.example.bookstore.dao.UserDao;
import org.example.bookstore.dto.*;
import org.example.bookstore.entity.*;
import org.example.bookstore.service.TimeService;
import org.example.bookstore.utils.MyUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.UserService;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
//@Scope("session")
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Autowired
    private UserAuthDao userAuthDao;

//    @Autowired
//    private TimeService timerService;

    @Autowired
    WebApplicationContext applicationContext;

    @Override
    public User findByUserID(String userID) {
        return userDao.findByUserID(userID);
    }

    public Response login(String userID, String password) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info(userID + " is trying to login" + " with password " + password);

        class ForLogin{
            public boolean isAdmin;
            ForLogin(){
                isAdmin = false;
            }
        }
        if (!userAuthDao.existsByUserIDAndPassword(userID, password)) {
            return new Response(400, "用户名或密码错误");
        }

        User user = userDao.findByUserID(userID);

        if (user == null) {
            return new Response(400, "用户不存在");
        }

        if(user.getIsBanned()){
            return new Response(400, "您的账户已被封禁");
        }
        MyUtils.setSession(userID);

        ForLogin fl = new ForLogin();
        fl.isAdmin = user.getIsAdmin();
        TimeService timeService = applicationContext.getBean(TimeService.class);
        timeService.startTimer();
        return new Response<ForLogin>(200, "登陆成功", fl);
    }

    public Response logout(HttpSession session) {
        if (session != null) {
            TimeService timeService = applicationContext.getBean(TimeService.class);
            long sessionDuration = timeService.stopTimer();
            session.invalidate();
            return new Response(200, "登出成功，会话时长：" + sessionDuration + "秒");
        }
        return new Response(400, "未登录");
    }

    public Response register(String userID, String password ,String email) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info(userID + " is trying to register" + " with password " + password);
        if (userDao.findByUserID(userID) != null) {
            return new Response(400, "用户名已存在");
        }
//        log.info("to here 0");
        User user = new User(userID,false,false, "", "", "", 0, 1, "", 0,email,  "");
//        log.info("to here 1");
        userDao.save(user);
//        log.info("to here 2");
        UserAuth userAuth = new UserAuth(userID,password);
//        log.info("to here 3");
        userAuthDao.save(userAuth);
        return new Response(200, "注册成功");
    }

    public void save(User user) {
        userDao.save(user);
    }

    public List<User> findAll() {
        return userDao.findAll();
    }

    public Response findByPageandUserID(Integer page, Integer size, String search) {
//        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Pageable pageRequest = PageRequest.of(page - 1, size);
        Page<User> userPage = userDao.findUsersByPageandUserID(pageRequest, search);

        List<UserDTO> userDTOs = userPage.getContent().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());

        class Data {
            public List<UserDTO> userDTOs;
            public int size;

            public Data(List<UserDTO> userDTOs, int size) {
                this.userDTOs = userDTOs;
                this.size = size;
            }
        }

        Data data = new Data(userDTOs, userDao.countNormalUsers(search));
        return new Response<Data>(200, "查询成功", data);
    }

    public Response setConsDTOwithOrders(List<Order> orders, Integer page, Integer size){
        class Data {
            private List<ConsDTO> ConsDTOs;
            private int size;

            public Data(List<ConsDTO> ConsDTOs, int size) {
                this.ConsDTOs = ConsDTOs;
                this.size = size;
            }

            //getters
            public List<ConsDTO> getConsDTOs() {
                return ConsDTOs;
            }
            public int getSize() {
                return size;
            }
        }
        //遍历所有用户，形成一个userID和ConsDTO的map
        List<User> users = userDao.findUsersByIsAdminFalse();
        Map<String, ConsDTO> consDTOMap = new HashMap<>();
        for(User user : users){
            String userID = user.getUserID();
            ConsDTO consDTO = consDTOMap.getOrDefault(userID, new ConsDTO(user));
            consDTOMap.put(userID, consDTO);
        }

        for (Order order : orders) {
            for (OrderItem orderItem : order.getOrderItems()) {
                String userID = order.getUser().getUserID();
                ConsDTO consDTO = consDTOMap.get(userID);

                consDTO.addCost(orderItem.getPrice());
                consDTO.addNum(orderItem.getQuantity());
            }
        }

        List<ConsDTO> consDTOs = new ArrayList<>(consDTOMap.values());
        //按照购买书籍总量排序
        consDTOs.sort((a, b) -> b.getTotalNum() - a.getTotalNum());
        //分页
        int mySize = consDTOs.size();
        int fromIndex = (page - 1) * size;
        int toIndex = Math.min(page * size, mySize);
        if(fromIndex > mySize){
            return new Response(400, "");
        }
        Data data = new Data(consDTOs.subList(fromIndex, toIndex), mySize);
        return new Response<Data>(200, "", data);
    }
}
