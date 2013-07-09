class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :check_browser

  private
    def check_browser
      user_agent = UserAgent.parse(request.user_agent)
      if user_agent.browser == 'Internet Explorer' && user_agent.version < '10.0'
      	 render text: 'Your browser is not supported! Please upgrade your browser to view our website!'
      end
    end
end
