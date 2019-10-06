FROM node:10.16.3
LABEL maintainer="Andy Kan <andy.kmc@hotmail.com>"

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Build application
RUN npm run build

# Expose API port to the outside
EXPOSE 3000

# Launch application
CMD ["npm","start"]