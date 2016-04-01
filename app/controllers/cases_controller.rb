class CasesController < ApplicationController

  def index
    if current_user.present?
      @cases = current_user.cases
    else
      @cases = []
    end
    @new_case = Case.new
    @templates = CaseTemplate.all
  end

  def create
    if current_user.present?
      kase = current_user.cases.build(case_params)
      if kase.save
        flash[:success] = t("cases_controller.create.success")
        redirect_to edit_case_path(kase)
      else
        flash[:error] = t("cases_controller.create.error")
        redirect_to :index
      end
    else
      flash[:danger] = "Please sign in first."
      redirect_to new_user_session_path
    end
  end

  def new
    @cases = Case.all
    @order_item = OrderItem.new
  end

  def edit
    @cases = Case.all
    @case = Case.find(params[:id])
  end

  def update
    @case = Case.find(params[:id])
    if @case.update_attributes(case_update_params)
      flash[:success] = "Case saved."
      redirect_to edit_case_path(@case)  
    end
  end

  def add_image
    @image = Image.new(file_upload_params)
    if @image.save
      respond_to do |format|
        format.js
      end
    end
  end

  private 

  def case_params
    params.require(:case).permit(:title, :template_id)
  end

  def case_update_params
    params.require(:case).permit(:saved_data, :saved_png)
  end

  def file_upload_params
    params.require(:case).permit(:case_id, :image)
  end
end
