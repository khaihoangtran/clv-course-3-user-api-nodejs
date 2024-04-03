export const listUser = {
  data: {
    users: [
      {
        user_id: '0ddce86a-4e1b-44c6-b148-efd4b9259318',
        full_name: 'test user 1',
        email: 'test.user1@gmail.com',
        password:
          '$2b$10$GnxXiCi5X6WGpukHhEIzTOFxu1H8y1OwGJqJdtslZ7h6.EeC1jkwy',
        role: 'user',
      },
      {
        user_id: '2acc14e6-6392-4a32-b7f2-76647420d3fa',
        full_name: 'test user 2',
        email: 'test.user2@gmail.com',
        password:
          '$2b$10$G9x1gltv47L77JCTvE60He5/C1BuHLzf/vauVlss68oNklvc8Cwwm',
        role: 'user',
      },
      {
        user_id: '5a02dde2-2198-42b5-b162-166877f4c978',
        full_name: 'test user 3',
        email: 'test.user3@gmail.com',
        password:
          '$2b$10$zcvB3BieAXLWVCY28GyBm.OCuf7X2PwN2Oz3ZpoO/bHE.un0ZHVpm',
        role: 'user',
      },
    ],
  },
};

export const userDoseNotExits = {
  errors: [
    {
      message: 'User dose not exits!',
      locations: [
        {
          line: 2,
          column: 3,
        },
      ],
      path: ['findUserById'],
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        status: 404,
        originalError: {
          message: 'User dose not exits!',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    },
  ],
  data: null,
};

export const user = {
  data: {
    findUserById: {
      user_id: '0ddce86a-4e1b-44c6-b148-efd4b9259318',
      full_name: 'test user 1',
      email: 'test.user1@gmail.com',
      password: '$2b$10$GnxXiCi5X6WGpukHhEIzTOFxu1H8y1OwGJqJdtslZ7h6.EeC1jkwy',
      role: 'user',
    },
  },
};

export const userTesting = {
  data: {
    createUser: {
      full_name: 'test user 4',
      user_name: 'testuser4',
      email: 'test.user4@gmail.com',
      role: 'user',
    },
  },
};
