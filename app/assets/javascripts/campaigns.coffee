$(document).on 'ready page:load', ->

  if currentView "campaigns", "new"

    $('#addCaseOption').on 'click', ->
      $.get "/campaigns/case_options/", {},
        (data) ->
          $('#caseOptions').append(data)
        ,'html'
