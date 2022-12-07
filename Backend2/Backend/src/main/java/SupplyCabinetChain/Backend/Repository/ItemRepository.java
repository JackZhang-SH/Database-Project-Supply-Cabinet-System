package SupplyCabinetChain.Backend.Repository;

import SupplyCabinetChain.Backend.entity.item;
import SupplyCabinetChain.Backend.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<item, Integer> {

    //    fina user by id
    @Query(
            value = "SELECT * FROM item WHERE item_id = ?1",
            nativeQuery = true)
    Optional<item> findItemById(int id);
//    @Query(
//            value = "UPDATE user SET user.user_password=?2 WHERE user.user_id=?1",
//            nativeQuery = true)
//    Optional<user> updatePasswordById(int id, String password);
}
