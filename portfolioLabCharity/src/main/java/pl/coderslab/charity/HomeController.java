package pl.coderslab.charity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HomeController {

private final InstitutionRepository institutionRepository;
private final DonationRepository donationRepository;

    public HomeController(InstitutionRepository institutionRepository, DonationRepository donationRepository) {
        this.institutionRepository = institutionRepository;
        this.donationRepository = donationRepository;
    }

    @RequestMapping("/")
    public String homeAction(Model model){
        model.addAttribute("quantityCount", donationRepository.getTotalQuantity());
        model.addAttribute("institution", institutionRepository.findAll());
        model.addAttribute("donationCount", donationRepository.count());
        return "index";
    }
}
