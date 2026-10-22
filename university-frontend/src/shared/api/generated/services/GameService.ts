/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameActionDto } from '../models/GameActionDto';
import type { StartGameDto } from '../models/StartGameDto';
import type { UpdateStudentDto } from '../models/UpdateStudentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiGameStart(
        requestBody: StartGameDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Game/start',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param studentId
     * @returns any OK
     * @throws ApiError
     */
    public static postApiGameNextDay(
        studentId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Game/next-day/{studentId}',
            path: {
                'studentId': studentId,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiGameSpecializations(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Game/specializations',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiGameSaves(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Game/saves',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiGame(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Game/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static patchApiGame(
        id: string,
        requestBody: UpdateStudentDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Game/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getApiGame(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Game/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param studentId
     * @param dayNumber
     * @returns any OK
     * @throws ApiError
     */
    public static getApiGameScheduleDay(
        studentId: string,
        dayNumber: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Game/{studentId}/schedule/day/{dayNumber}',
            path: {
                'studentId': studentId,
                'dayNumber': dayNumber,
            },
        });
    }
    /**
     * @param studentId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiGameScheduleSemester(
        studentId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Game/{studentId}/schedule/semester',
            path: {
                'studentId': studentId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiGameAction(
        requestBody: GameActionDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Game/action',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
