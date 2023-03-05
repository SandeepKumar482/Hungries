import 'package:auth/src/domain/auth_service.dart';
import '../domain/token.dart';
import 'package:async/async.dart';

class SignInUsecase {
  final IAuthService _authService;

  SignInUsecase(this._authService);

  Future<Result<Token>> execute() async {
    return await _authService.signIn();
  }
}
