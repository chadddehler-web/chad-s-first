import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

const originalFetch = global.fetch;

beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  global.fetch = originalFetch;
});
