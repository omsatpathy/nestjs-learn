import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Otp } from "src/entities/Otp";
import { Repository } from "typeorm";


@Injectable()
export class OtpCleanupService {

    constructor(
        @InjectRepository(Otp) private otpRepository: Repository<Otp>
    ) {};

    @Cron('*/2 * * * *')
    async cleanExpiredOtps() {
        await this.otpRepository.createQueryBuilder()
        .delete()
        .from(Otp)
        .where('otp IS NOT NULL AND otpTimestamp IS NOT NULL')
        .execute();
    }
}