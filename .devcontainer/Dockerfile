FROM mcr.microsoft.com/vscode/devcontainers/ruby:3.2

# Install Bundler
RUN gem install bundler

# Set working directory
WORKDIR /workspace

# Copy Gemfile and Gemfile.lock for dependency install
COPY Gemfile Gemfile.lock ./

# Install all dependencies from Gemfile
RUN bundle install

# Expose default Jekyll port
EXPOSE 4000

# Start Jekyll using bundle exec
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
