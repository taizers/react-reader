// eslint-disable-next-line @typescript-eslint/no-var-requires
const { User } = require('../../db/models/index');
import UserDto from '../../dtos/user.dto';
import { UserType } from '../../types/entities/global.entities.type';

// const getUserForResponceWithToken = async (user:UserType) => {
//   const userDto = new UserDto(user);

//   const tokens = generateTokens(userDto.id, userDto.role);

//   await saveToken(userDto.id, tokens.refresh_token);

//   return { ...tokens, user: userDto };
// };

export const  getAllUsers = async () => {
  const users = await User.findAll();

  const usersDto = users.map((user:UserType) => {
    const userDto = new UserDto(user);

    return { ...userDto };
  });

  return usersDto;
}

export const createUser = async (payload: object) => {
  try {
    return await User.create(payload);  
  } catch (erroror) {
    console.log(erroror)
    throw new erroror('Пользователь не создан');
  }
};

export const  getUser = async (where: object) => {
  const user = await User.findOne({ where });

  return user;
}


//name: string, password: string, oldPassword: string, userId: string
export const  updateUser = async (id: string, payload: object) => {
  // const oldUser = await User.findByPk(userId);
  // const updatingUserData: any = {};

  // if (password && oldPassword) {
  //   const isPasswordEquals = await bcrypt.compare(
  //     oldPassword,
  //     oldUser.password
  //   );

  //   if (!isPasswordEquals) {
  //     throw new BadCredentialserroror('Неправильный пароль');
  //   }

  //   const encryptedPassword = await bcrypt.hash(password, 10);

  //   updatingUserData.password = encryptedPassword;
  // } else {
  //   updatingUserData.password = oldUser.password;
  // }

  // if (name) {
  //   updatingUserData.name = name;
  // } else {
  //   updatingUserData.name = oldUser.name;
  // }
  // const user = await User.update(
  //   { name: updatingUserData.name, password: updatingUserData.password },
  //   { where: { id: userId } }
  // );

  // return getUserForResponceWithToken(user);
}

export const deleteUser = async (id: string) => {
  await User.destroy({ where: { id } });
}
