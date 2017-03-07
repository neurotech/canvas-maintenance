FROM nodesource/jessie:6.4.0
MAINTAINER Tim Douglas <neurotech@gmail.com>

# Set timezone
RUN echo "Australia/Sydney" > /etc/timezone
ENV TZ="Australia/Sydney"

# Update, then install libxml2 for ibm_db
RUN apt-get update && apt-get install -y libxml2

# Install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Install node modules
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN $HOME/.yarn/bin/yarn

# Copy application code
COPY . .

# Cleanup
RUN rm -rf /var/lib/apt/lists/* /tmp/* /root/.npm /root/.node-gyp `$HOME/.yarn/bin/yarn cache dir`

# Run the application
USER nobody
CMD [ "node", "index.js" ]
