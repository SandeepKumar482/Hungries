import 'dart:convert';

import 'package:auth/src/domain/crendentials.dart';
import 'package:async/src/result/result.dart';
import '../../infra/api/auth_api_contract.dart';
import 'package:http/http.dart' as http;

import 'Mapper.dart';

class AuthApi implements IApiAuth {
  final http.Client _client;
  String baseUrl;

  AuthApi(this.baseUrl, this._client);

  @override
  Future<Result<String>> signin(Credentials credential) async {
    var endpoint = baseUrl + 'auth/signin';

    return await _postCredentails(baseUrl, credential);
  }

  @override
  Future<Result<String>> signup(Credentials credential) async {
    var endpoint = baseUrl + '/auth/signup';
    return await _postCredentails(endpoint, credential);
  }

  Future<Result<String>> _postCredentails(
      String endpoint, Credentials credential) async {
    var response = await _client.post(endpoint as Uri,
        body: jsonEncode(Mapper.toJson(credential)),
        headers: {"Content-type": "application/json"});

    if (response.statusCode != 200) {
      // Map map = jsonDecode(response.body);
      return Result.error('Server Error');
    }
    var json = jsonDecode(response.body);
    return json['auth_token'] != null
        ? Result.value(json['auth_token'])
        : Result.value(json['message']);
  }
}
