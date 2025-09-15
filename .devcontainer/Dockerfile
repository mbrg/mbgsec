FROM mcr.microsoft.com/vscode/devcontainers/ruby:3.2

# Install Bundler
RUN gem install bundler

# Set working directory
WORKDIR /workspace

# Expose default Jekyll port
EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--incremental"]