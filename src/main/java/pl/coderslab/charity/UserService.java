package pl.coderslab.charity;

public interface UserService {

    User findByUserName(String name);

    void saveUser(User user);
}