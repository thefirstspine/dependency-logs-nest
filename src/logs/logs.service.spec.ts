import {describe, expect, beforeEach, it} from '@jest/globals';
import { LogsService } from './logs.service';

describe('LogsService', () => {
  let service: LogsService;

  beforeEach(async () => {
    service = new LogsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
