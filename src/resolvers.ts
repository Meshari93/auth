import * as bcrypt from 'bcryptjs';
import { ResolverMap } from "./types/graphql-utils";
import { User } from './entity/User';

export const resolvers: ResolverMap = {
    Query: {
      hello: (_: any, { name }: GQL.IHelloOnQueryArguments) => `Meshari ${name || 'World'}`,
    },
    Mutation: {
      register: async (
        _, { email, password }: GQL.IRegisterOnMutationArguments
       ) => {
        const hashedPasswrod = await bcrypt.hash(password, 10);
        const user =  User.create({
          email,
          password: hashedPasswrod,
        });

        await user.save();
       return true; 
      }
    },
  }; 