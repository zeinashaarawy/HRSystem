import { AvailabilityService } from './availability.service';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { AvailabilityResponseDto } from './dto/availability-response.dto';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    checkAvailability(query: CheckAvailabilityDto): Promise<AvailabilityResponseDto>;
}
