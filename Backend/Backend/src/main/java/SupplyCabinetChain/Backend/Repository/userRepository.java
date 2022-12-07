package SupplyCabinetChain.Backend.Repository;

import SupplyCabinetChain.Backend.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface userRepository extends JpaRepository<user, Integer> {

//    fina user by id
    @Query(
        value = "SELECT * FROM user WHERE user.user_id = ?1",
        nativeQuery = true)
    Optional<user> findUserById(int id);
//    @Query(
//            value = "UPDATE user SET user.user_password=?2 WHERE user.user_id=?1",
//            nativeQuery = true)
//    Optional<user> updatePasswordById(int id, String password);
}
