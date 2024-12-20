package org.example.bookstore.repository;

import org.example.bookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserAuthRepository extends JpaRepository<UserAuth, String> {
//    @Query("SELECT CASE WHEN COUNT(ua) > 0 THEN true ELSE false END " +
//            "FROM UserAuth ua " +
//            "WHERE ua.userID = :userID AND ua.password = :password")
//    boolean existsByUserIDAndPassword(@Param("userID") String userID, @Param("password") String password);

    @Query("SELECT validate_password(:userID, :password) FROM UserAuth")
    Boolean existsByUserIDAndPassword(@Param("userID") String userID, @Param("password") String password);
}
