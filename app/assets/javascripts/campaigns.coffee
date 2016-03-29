$(document).on 'ready page:load', ->

  if currentView "campaigns", "new"

    $('#addCaseOption').on 'click', ->
      caseId = $('#Cases option:selected').val()
      console.log caseId
      $.get "/campaigns/case_options/",
        case:
          id: caseId
        (data) ->
          $('#caseOptions').append(data)
        ,'html'

    $('#Brands').on 'change', ->
      selectedBrandId = $(this).children('option:selected').val()
      $.get '/campaigns/cases_by_brand',
        case:
          brand: selectedBrandId
        (data) ->
          console.log(data)
          $('#Cases').html(data)
        ,'html'
