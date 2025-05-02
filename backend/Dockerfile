# ------------ base layer -------------
    FROM node:23-alpine AS base
    WORKDIR /app
    
    # 1) copy lockfile + install deps
    COPY package.json package-lock.json ./
    RUN npm ci
    
    # 2) copy the rest of the project – *including* tsconfig.json
    COPY tsconfig.json ./
    COPY src ./src
    
    # ------------ dev image -------------
    FROM base AS dev
    CMD ["npm","run","dev"]
    
    # ------------ prod image ------------
    FROM base AS prod
    RUN npm run build && npm prune --production
    CMD ["node","dist/index.js"]
    