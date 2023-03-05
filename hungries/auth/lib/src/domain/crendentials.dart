class Credentials {
  final String email;
  final String? password;
  final String? name;
  final AuthType authType;

  Credentials({
    required this.authType,
    required this.email,
    this.password,
    this.name
  });
}

enum AuthType { email, google }
