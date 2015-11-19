class CasesController < ApplicationController
  before_action :set_case, only: [:show]

  def new
    @case = Case.new
  end

  def show
  end

  def create
    @case = Case.new(case_params)
    if params[:case].present?
      file = params[:case][:image]
      File.open(Rails.root.join('public', 'uploads', file.original_filename), 'wb') do |f|
        f.write(file.read)
      end
      @case.image = "/uploads/" + file.original_filename
    end
    if @case.save
      redirect_to @case, notice: "Case was successfully created"
    end
  end

  private

  def set_case
    @case = Case.find(params[:id])
  end

  def case_params
    params.require(:case).permit(:ipad, :iphone, :android, :image)
  end
end
