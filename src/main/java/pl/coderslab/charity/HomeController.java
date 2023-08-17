package pl.coderslab.charity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;


@Controller
public class HomeController {

private final InstitutionRepository institutionRepository;
private final DonationRepository donationRepository;
    private final UserService userService;
    private final UserRepository userRepository;


    public HomeController(InstitutionRepository institutionRepository, DonationRepository donationRepository, UserService userService, UserRepository userRepository) {
        this.institutionRepository = institutionRepository;
        this.donationRepository = donationRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @RequestMapping("/")
    public String homeAction(Model model){
        model.addAttribute("quantityCount", donationRepository.getTotalQuantity());
        model.addAttribute("institution", institutionRepository.findAll());
        model.addAttribute("donationCount", donationRepository.count());
        return "index";
    }
    @GetMapping("/register")
    public String add(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }
    @PostMapping("/register")
    public String add(@Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "register";
        }
        userService.saveUser(user);
        return "redirect:/login";
    }
    @RequestMapping(value = {"/login"}, method = RequestMethod.GET)
    public String login() {
        return "login";
    }
}
