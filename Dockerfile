# FROMの前のARGはレイヤー化しないが、ビルドステージで使えない（FROMにのみ有効）
ARG NODE_VERSION
FROM node:$NODE_VERSION-alpine as node

# ENVはコンテナ内で環境変数として使いたい定数を指定する。ビルドのみ必要な定数はARGで十分
ENV APP_ROOT=/app

# RUN mkdir は WORKDIR で省略できる
WORKDIR $APP_ROOT

RUN apk upgrade --no-cache && \
    apk add --no-cache build-base && \
    # entrypointでパッケージをインストールする。
    # ビルド中はボリュームがマウントされていないため、毎回フルインストールになるので避ける
    echo $'#!/bin/sh \n\
echo "installing yarn packages..."\n\
yarn install --silent \n\
echo "starting container entrypoint..."\n\
exec "$@" \n\
' > /usr/local/bin/entrypoint.sh && \
    chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT [ "entrypoint.sh" ]

EXPOSE 8080
