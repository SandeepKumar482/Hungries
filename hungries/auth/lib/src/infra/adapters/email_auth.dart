import 'dart:html';

import 'package:async/async.dart';
import '../../domain/auth_service.dart';
import '../../domain/crendentials.dart';
import '../../domain/signUp_service.dart';
import '../../domain/token.dart';
import '../api/auth_api_contract.dart';

class EmailAuth implements IAuthService, ISignUpService {
  final IApiAuth _api;
  late Credentials _credential;

  EmailAuth(this._api);

  void credential({required String email, required String password}) {
    _credential = Credentials(
        authType: AuthType.email, email: email, password: password);
  }

  @override
  Future<Result<Token>> signIn() async {
    assert(_credential != null);
    try {
      var result = await _api.signin(_credential);

      return Result.value(Token(value: result.asValue!.value));
    } catch (e) {
      return Result<Token>.error(e);
    }
  }

  @override
  Future<void> signOut() {
    // TODO: implement signOut
    throw UnimplementedError();
  }

  @override
  Future<Result<Token>> signup(
      String name, String email, String password) async {
    Credentials credentials = Credentials(
        authType: AuthType.email, email: email, password: password, name: name);

    try {
      var result = await _api.signup(credentials);

      return Result.value(Token(value: result.asValue!.value));
    } catch (e) {
      return Result<Token>.error(e);
    }
  }
}
