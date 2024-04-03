import { invalidEmail, mockLongName, mockUser } from '@root/src/__mock__/users';
import { CreateUserDto } from '@users/dtos/create.user.dto';
import { UpdateUserDto } from '@users/dtos/update.user.dto';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

describe('CreateUserDto', () => {
  it('Should be valid with valid properties', () => {
    const createUserDto = plainToClass(CreateUserDto, mockUser);
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(0);
  });
  it('Should throw bad request exception with invalid email', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...mockUser,
      email: invalidEmail,
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['isEmail']).toEqual('Email is invalid');
  });

  it('Should throw bad request exception with empty email', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...mockUser,
      email: '',
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['isEmail']).toEqual('Email is invalid');
  });

  it('Should throw bad request exception with empty username', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...mockUser,
      user_name: '',
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'user_name must be longer than or equal to 5 characters',
    );
  });

  it('Should throw bad request exception with empty password', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...mockUser,
      password: '',
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'password must be longer than or equal to 6 characters',
    );
  });

  it('Should throw bad request exception with empty full name', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...mockUser,
      full_name: '',
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'full_name must be longer than or equal to 5 characters',
    );
  });

  it('Should throw bad request exception with full name is shorter than 5 characters', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...mockUser,
      full_name: 'hoan',
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'full_name must be longer than or equal to 5 characters',
    );
  });

  it('Should throw bad request exception with full name is longer than 50 characters', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...mockUser,
      full_name: mockLongName,
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['maxLength']).toEqual(
      'full_name must be shorter than or equal to 50 characters',
    );
  });

  it('Should throw bad request exception with password is shorter than 6 characters', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...mockUser,
      password: 'hello',
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'password must be longer than or equal to 6 characters',
    );
  });
});

describe('UpdateUserDto', () => {
  it('Should be valid with valid properties', () => {
    const updateUserDto = plainToClass(UpdateUserDto, mockUser);
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(0);
  });

  it('Should throw bad request exception with invalid email', () => {
    const updateUserDto = plainToClass(UpdateUserDto, {
      ...mockUser,
      email: invalidEmail,
    });
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['isEmail']).toEqual('Email is invalid');
  });

  it('Should throw bad request exception with empty email', () => {
    const updateUserDto = plainToClass(UpdateUserDto, {
      ...mockUser,
      email: '',
    });
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['isEmail']).toEqual('Email is invalid');
  });

  it('Should throw bad request exception with empty username', () => {
    const updateUserDto = plainToClass(UpdateUserDto, {
      ...mockUser,
      user_name: '',
    });
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'user_name must be longer than or equal to 5 characters',
    );
  });

  it('Should throw bad request exception with empty password', () => {
    const updateUserDto = plainToClass(UpdateUserDto, {
      ...mockUser,
      password: '',
    });
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'password must be longer than or equal to 6 characters',
    );
  });

  it('Should throw bad request exception with empty full name', () => {
    const updateUserDto = plainToClass(UpdateUserDto, {
      ...mockUser,
      full_name: '',
    });
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'full_name must be longer than or equal to 5 characters',
    );
  });

  it('Should throw bad request exception with full name is shorter than 5 characters', () => {
    const updateUserDto = plainToClass(UpdateUserDto, {
      ...mockUser,
      full_name: 'hoan',
    });
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'full_name must be longer than or equal to 5 characters',
    );
  });

  it('Should throw bad request exception with full name is longer than 50 characters', () => {
    const updateUserDto = plainToClass(UpdateUserDto, {
      ...mockUser,
      full_name: mockLongName,
    });
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['maxLength']).toEqual(
      'full_name must be shorter than or equal to 50 characters',
    );
  });

  it('Should throw bad request exception with password is shorter than 6 characters', () => {
    const updateUserDto = plainToClass(UpdateUserDto, {
      ...mockUser,
      password: 'hello',
    });
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints['minLength']).toEqual(
      'password must be longer than or equal to 6 characters',
    );
  });
});
