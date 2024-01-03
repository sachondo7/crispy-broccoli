#!/bin/sh
echo "Starting app1"
npm run typeorm migration:run -- -d ./src/infrastructure/database/data-source.ts
echo "Migration done"
npm start