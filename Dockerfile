# ____________________________
#< Sean's Working Environment >
# ----------------------------
#        \   ^__^
#         \  (oo)\_______
#            (__)\       )\/\
#                ||----w |
#                ||     ||

# GitHub: 
# Usage:
# Ports:
# Docs: 

# Base Image- Debian Testing
FROM debian:buster

# Update Sources
RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y

# Set Locale
RUN apt-get install -y locales locales-all
ENV LC_ALL en_GB.UTF_8
ENV LANG en_GB.UTF_8
ENV LANGUAGE en_GB.UTF_8

# Install Prerequisites
RUN apt-get install -y zsh neovim python3-pip tmux
RUN pip3 install ansible

# Run tools playbook
COPY ./tools /tmp/tools
RUN ansible-playbook /tmp/tools/install-all.yml

# Create User
RUN useradd -ms /bin/zsh sean
USER sean
WORKDIR /home/sean

# Add directories

# Set Entrypoint
CMD tmux
