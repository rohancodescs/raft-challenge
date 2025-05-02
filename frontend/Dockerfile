# ------------ base layer -------------
    FROM node:23-alpine AS base
    WORKDIR /app
    
    # 1) copy lockfile and install deps
    COPY package.json package-lock.json ./
    RUN npm ci                          # installs ALL deps inc. dev
    
    # 2) copy the rest of the project
    # COPY tsconfig.json next.config.ts tailwind.config.ts postcss.config.js ./
    COPY tailwind.config.js postcss.config.cjs tsconfig.json next.config.ts ./
    COPY public ./public
    COPY app ./app
    COPY components ./components
    COPY lib ./lib
    
    # ------------ dev image -------------
    FROM base AS dev
    ENV PORT 3000
    CMD ["npm","run","dev"]             # next dev server w/ HMR
    
    # ------------ prod image ------------
    FROM base AS prod
    ENV NODE_ENV production
    RUN npm run build && \
        npm prune --production          # strip dev‑deps
    CMD ["npm","run","start"]           # starts Next in standalone mode
    