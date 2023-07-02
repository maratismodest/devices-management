/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type CreateGatewayDto = {
  sn: string;
  name: string;
  ip4: string;
  devices: string[];
};

export interface Gateway {
  _id: string;
  /**
   * Serial Number
   * @example "sn-123456"
   */
  sn: string;
  /**
   * Human readable name
   * @example "Some gateway"
   */
  name: string;
  /**
   * IP-address
   * @example "8.8.8.8"
   */
  ip4: string;
  /**
   * IP-address
   * @example "[1111, 2222, 3333]"
   */
  devices: string[];
}

export interface CreateDeviceDto {
  /**
   * Uid
   * @example 1234567
   */
  uid: number;
  /**
   * Vendor
   * @example "TP-Link"
   */
  vendor: string;
  /**
   * Time (timestamp)
   * @example 1688193506
   */
  date: number;
  /**
   * Status (online/offline)
   * @example true
   */
  status: boolean;
}

export interface Device {
  _id: string;
  /**
   * Uid
   * @example 123456
   */
  uid: number;
  /**
   * vendor
   * @example "TP link"
   */
  vendor: string;
  /**
   * Date
   * @example 1688174565
   */
  date: number;
  /**
   * status
   * @example true
   */
  status: boolean;
}
