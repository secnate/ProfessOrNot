package com.professornot.api.v1;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

@RestController
@RequestMapping("/v1/debug")

public class DebugController {

    @GetMapping(value = "/hello", produces = "application/json")
    @ResponseBody
    public String helloWorld() {
        return new JSONObject()
                .put("message", "Hello World!")
                .toString();
    }

    @GetMapping(value = "/userid", produces = "application/json")
    @ResponseBody
    public String getUserId() {
        return new JSONObject()
                .put("user_id", SecurityContextHolder.getContext().getAuthentication().getName())
                .toString();
    }
}
