import { ErrorRepository } from "../errorRepository";

describe('ErrorRepository class', () => {
    let errorRepo;

    beforeEach(() => {
        errorRepo = new ErrorRepository();
    });

    test('should return "Unknown error" for nonexistent error code', () => {
        expect(errorRepo.translate(999)).toBe('Unknown error');
    });

    test('should return error description for existing code', () => {
        errorRepo.addError(404, 'Not Found');
        expect(errorRepo.translate(404)).toBe('Not Found');
    });

    test('should return error description for another existing code', () => {
        errorRepo.addError(500, 'Internal Server Error');
        expect(errorRepo.translate(500)).toBe('Internal Server Error');
    });

    test('should handle multiple errors', () => {
        errorRepo.addError(400, 'Bad Request');
        errorRepo.addError(401, 'Unauthorized');
        expect(errorRepo.translate(400)).toBe('Bad Request');
        expect(errorRepo.translate(401)).toBe('Unauthorized');
        expect(errorRepo.translate(403)).toBe('Unknown error'); 
    });
});