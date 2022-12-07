package SupplyCabinetChain.Backend.Repository;


import SupplyCabinetChain.Backend.entity.good;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GoodRepository extends JpaRepository<good, Integer> {

    //    fina user by id
    @Query(
            value = "SELECT * FROM good WHERE good_id = ?1",
            nativeQuery = true)
    Optional<good> findGoodById(int id);
    @Query(
            value = "SELECT * FROM good WHERE v_user_id = ?1 AND v_branch_id= ?2",
            nativeQuery = true)
    List<good> findGoodByVbranch(int  v_user_id, int v_branch_id);
//    @Query(
//            value = "UPDATE user SET user.user_password=?2 WHERE user.user_id=?1",
//            nativeQuery = true)
//    Optional<user> updatePasswordById(int id, String password);
}