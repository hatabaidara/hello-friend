package com.tonsite.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MemberAiScheduler {

    private final MemberAiService memberAiService;

    public MemberAiScheduler(MemberAiService memberAiService) {
        this.memberAiService = memberAiService;
    }

    @Scheduled(cron = "0 0 1 * * *")
    public void updateAllScoresNightly() {
        memberAiService.recalculateAll();
    }
}
