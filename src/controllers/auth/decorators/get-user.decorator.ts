import { createParamDecorator, UnauthorizedException } from "@nestjs/common";
import { UserPayload } from "../models/user-payload.interface";

export const GetUser = createParamDecorator((data: any, req: any): UserPayload => {
    if (req?.args[0])
        return req.args[0].user as UserPayload;

    throw new UnauthorizedException();
});