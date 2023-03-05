import 'package:auth/src/domain/signUp_service.dart';

import '../domain/token.dart';
import 'package:async/async.dart';


class SignUpUsecase {
  final ISignUpService _iSignUpService;

  SignUpUsecase(this._iSignUpService);

  Future<Result<Token>> execute(
      String name, String email, String password) async {
    return await _iSignUpService.signup(name, email, password);
  }
}
