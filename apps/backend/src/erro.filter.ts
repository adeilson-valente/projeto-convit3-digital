import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(Error)
export default class ErroFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const cxt = host.switchToHttp();
        const request = cxt.getRequest<Request>();
        const response = cxt.getResponse<Response>();

        const status = (exception as any).getStatus ? (exception as any).getStatus() : 500;

        console.error(exception);

        response.status(status).json({
            statusCode: status,
            timeStamp: new Date().toISOString(),
            path: request.url,
            messagem: exception.message,
        });
    }
}