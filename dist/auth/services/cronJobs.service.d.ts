import { Otp } from "src/entities/Otp";
import { Repository } from "typeorm";
export declare class OtpCleanupService {
    private otpRepository;
    constructor(otpRepository: Repository<Otp>);
    cleanExpiredOtps(): Promise<void>;
}
