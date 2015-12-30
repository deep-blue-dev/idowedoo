module ApplicationHelper
  def flash_class(type)
    case type
      when 'notice'
        'alert-info'
      when 'success'
        'alert-success'
      when 'error'
        'alert-danger'
      when 'alert'
        'alert-warning'
      else
        'alert-info'
    end
  end
end
