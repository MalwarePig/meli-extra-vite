const env = {};
/* Servidor */
env.FRONTEND_URL = 'https://192.168.1.9:3000'  /* 'https://frontend-meli-qfrr.onrender.com'; */
env.PORT_SERVER = process.env.PORT || 4000;
/* Database */
env.DATABASE_URL = 'https://meli-extra-default-rtdb.firebaseio.com';
/* GOOGLE KEY */
env.type = "service_account",
env.project_id = "meli-extra",
env.private_key_id = "9707e325e801c045a3707b00e246636aee38f5bc",
env.private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHuEkMk5w8pkKf\n2QeldeLaSrbBE8ZXmKXtk3wLP0uKxE30LbJjMaX5gL6oZjpfSIuQFKowFdn9tqzh\nl4jjdnhbrW821oJ3wva5caNeG69ABhUr/VM6CuyIikHjcz1Uh3nJRqgblCpg5rHp\nHI30PMLp2F0zAlbVy4GIJncu0bVXLV0DfD/CSGZIGwPTfX1LD+1Xy4+LJhzKWoaq\naCt5rClqFA0AABNFBoewUM0bNU6oHv73eAS8PO1C+2VAA0scWimBBLEkddviU/Iw\nuQ+xDTJpe2wt5d71Do0nj/l4FbE4hSCKEG5A7S60H918ruu6BX8kIjg7cR+05oxl\nre7eG/aRAgMBAAECggEABMPzLENmZjUSYGWJjutj7RD80NkTsbng9az/9/W76/T4\npjOj7sV7wBsQEY0U5fqhZ9/yWqDe2XSvJdfbio/kWc2m2nBeXxSuFekt/HwdH6I1\nhZ3vCzLBB5YC8fYpN7fe0kxnDPdpVnQSuSz2/yWnAfTpbmLnJwVK0zCVxe53jPur\niqdHZM/VlcuL/OBnaBJcmArIxchImjIawbSwKaLkuab0tdFLDZFRaGRb5R+rcEof\nPhBkCtNLPgAeY1FDkEMLTy6mIEvaS5aA+WZf7dXwBNnZWm6bQYo2CBTO0qXkW9Ua\npmPO3NrnSPNIU+x261beJR7EZOSRV/WH49QYQFIHhQKBgQD0M4ila8XTr8JzIZzO\n7pIYOiP0lYuoHlHs8zcPSB9PF0qSHjBh9f925EZY5egrid/wWuy6qF353FU38Rkb\n2sroNbmxMzQevk1RzJL9Z3eKdgcknRNEVmR8ujUXsy1PhuQjKEEgNQ4su504WWVu\nWhhKdW4HFb1jXLDHjujGdVgXlQKBgQDRXpJPoX4L7FkXhZI31wZWtRCIPqY4gyeC\nIbGPuBGkvfye5OvUsVCoJw9w5VwbOdJEZn+RF4pNWhD5dsDJI2tkIIfj1ZfqqVve\nKoxA/e6S6Hdlw9Ma8ZacrY4jdvJy2LhxqEscAa12eUGl4bb0dtb8H3kMvJttWb6x\n/phJ3Fa0DQKBgBBgYFqPlq2yjLzB1U0/TIbZZ03gtYPpvJ7CVL/um0LnkfWolqAL\nKj2j41/U0zQQQ/dPca622c6GyyQ8Q+3NR2w5JiHPCEDDjFXe/UCHLsoXTjVTX1Zm\n4MhIiIT1XCWIK0Z8TZnGVRQE5O9Bd37mBdkAdQd+mrvOHIDVgaDFf8ndAoGAInoY\nTdSiFQSOhzkPovJdsNmQJ19pr9SpJNy3iJsfDKncd63qx9OLHKWR/V1HlZQn8+uN\nBi+CLsquEOZlSLn0bUCOIA6EPbg10JfhELLAHqD5SGC+2qj9zD8oMN7dfdwCQ3Ub\nKTl9fwzoqpBIuGj5bfsgy+AjGBa3OEhce401GeECgYA8ZLPVKdRg0SyJGFuHslhR\n+j+HTzwwWNoNzYtMlk12MVuNzAqDW8vXPpcs0d9s+irzGgwpbYyX204S07jTfBYc\n/kAUfrShP7Zyv0Nib9GvgEI8S8z3O0boWzl4EvLJJc6RZBag2o/Lf8L9xvu4TLiF\nepoc7r8gxSeUqx2XruEkdA==\n-----END PRIVATE KEY-----\n",
env.client_email = "firebase-adminsdk-fbsvc@meli-extra.iam.gserviceaccount.com",
env.client_id = "106306865793865633211",
env.auth_uri = "https://accounts.google.com/o/oauth2/auth",
env.token_uri = "https://oauth2.googleapis.com/token",
env.auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs",
env.client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40meli-extra.iam.gserviceaccount.com",
env.universe_domain = "googleapis.com"


module.exports = env ; 