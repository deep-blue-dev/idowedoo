class CampaignsController < ApplicationController

  include CampaignsHelper

  before_action :set_campaign, only: [:show, :edit, :update, :destroy]
  before_action :set_campaign_length_options, only: [:new, :setup, :edit, :update]
  before_action :set_brands_cases_options, only: [:new, :setup, :edit]

  # GET /campaigns
  # GET /campaigns.json
  def index
    @campaigns = Campaign.all
  end

  # GET /campaigns/1
  # GET /campaigns/1.json
  def show
  end

  # GET /campaigns/new
  def new
    @campaign = Campaign.new
    @campaign.finish = Date.today + 3.days
  end

  def setup
    c = Case.find(params[:campaign][:case_id])
    c.update_attributes(case_save_params)
    @campaign = Campaign.new({case_id: params[:campaign][:case_id]})
    @campaign.finish = Date.today + 3.days
    render :new
  end

  def case_options
    selected_case = Case.find case_params[:id]
    render partial: 'case_options',
           locals:  {selected_case: selected_case},
           layout: false
  end

  def cases_by_brand

    cases = Case.where(brand: case_params[:brand])

    render partial: 'cases_by_brand',
           locals:  {cases: cases},
           layout:  false
  end

  # GET /campaigns/1/edit
  def edit
    @campaign = Campaign.find(params[:id])
    @campaign.finish = Date.today + 3.days
  end

  # POST /campaigns
  # POST /campaigns.json
  def create
    @campaign = Campaign.new(campaign_params)
    @campaign.user = current_user
    @campaign.start = Date.today

    respond_to do |format|
      if @campaign.save
        format.html { redirect_to @campaign, notice: 'Campaign was successfully created.' }
        format.json { render :show, status: :created, location: @campaign }
      else
        format.html { render :new }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /campaigns/1
  # PATCH/PUT /campaigns/1.json
  def update
    respond_to do |format|
      if @campaign.update(campaign_params)
        format.html { redirect_to @campaign, notice: 'Campaign was successfully updated.' }
        format.json { render :show, status: :ok, location: @campaign }
      else
        format.html { render :edit }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /campaigns/1
  # DELETE /campaigns/1.json
  def destroy
    @campaign.destroy
    respond_to do |format|
      format.html { redirect_to campaigns_url, notice: 'Campaign was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_campaign
      @campaign = Campaign.find(params[:id])
    end

    def set_campaign_length_options

      max_campaign_length = 21

      ## Make an array of numbers divisible by
      amount = (1..max_campaign_length).select{|i| i.modulo(3).zero? }

      @campaign_length_options = []

      amount.each do |day|
        @campaign_length_options << date_time_options(day)
      end

    end

    # Never trust parameters from the scary internet, only allow the white list through.

    def case_params
      params.require(:case).permit(:id, :brand)
    end

    def campaign_params
      params.require(:campaign).permit(:title, :description, :start, :finish, :user_id, :goal_unit)
    end

    def set_brands_cases_options
      @brands = Brand.all
      @cases = @brands.first.try(:cases) || []
    end

    def case_save_params
      params.require(:case).permit(:saved_png, :saved_data)
    end

end
