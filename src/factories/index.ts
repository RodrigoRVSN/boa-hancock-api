import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { MatchesModule } from './matches/user.module';
import { UserModule } from './user/user.module';

export const factoriesModules = [
  LikesModule,
  UserModule,
  MatchesModule,
  AuthModule,
  MessagesModule,
];
