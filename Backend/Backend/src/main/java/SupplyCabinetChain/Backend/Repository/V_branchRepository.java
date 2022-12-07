package SupplyCabinetChain.Backend.Repository;

import SupplyCabinetChain.Backend.entity.c_branch;
import SupplyCabinetChain.Backend.entity.item;
import SupplyCabinetChain.Backend.entity.user;
import SupplyCabinetChain.Backend.entity.v_branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface V_branchRepository extends JpaRepository<v_branch, Integer> {

    //    fina user by id
    @Query(
            value = "SELECT * FROM v_branch WHERE V_user_id=?1 AND V_branch_id = ?2",
            nativeQuery = true)
    Optional<v_branch> findVbranchById(int V_user_id, int V_branch_id);
    @Query(
            value = "SELECT * FROM v_branch WHERE V_user_id=?1",
            nativeQuery = true)
    List<v_branch> findAllVbranchByUserId(int V_user_id);
//    @Query(
//            value = "UPDATE user SET user.user_password=?2 WHERE user.user_id=?1",
//            nativeQuery = true)
//    Optional<user> updatePasswordById(int id, String password);
}
