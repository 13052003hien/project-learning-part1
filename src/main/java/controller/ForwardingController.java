package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForwardingController {
    // Chuyển hướng nội bộ tới index.html cho các route không phải API
    @GetMapping(value = {"/", "/{path:[^\\.]*}"})
    public String forwardNonApiPaths() {
        return "forward:/index.html"; 
    }
}
