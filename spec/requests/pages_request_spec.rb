require 'rails_helper'

RSpec.describe "Pages", type: :request do
  describe "index" do
    it 'returns 200' do
      get root_path
      expect(response.status).to eq(200)
      expect(response.body).to match("This site is under construction")
      expect(response.body).to match("subscribe")
    end
  end

  describe "landing email" do
    let!(:email) { "test@test.com" }
    let!(:invalid_email) { "invalid_email" }
    it 'should create landing email with correct email' do
      expect do
        post landing_email_subscribe_path, landing_email: {email: email}
      end.to change{ LandingEmail.count }.by(1)
      landing_email = LandingEmail.last
      expect(landing_email.email).to eq(email)
      expect(flash[:success]).to be_present
    end

    it 'should render error for incorrect email' do
      expect do
        post landing_email_subscribe_path, landing_email: {email: invalid_email}
      end.to change{ LandingEmail.count }.by(0)
      expect(flash[:error]).to eq(["Email " + I18n.t('landing_email.errors.invalid_email')])
    end

    it 'should render error for missing email' do
      expect do
        post landing_email_subscribe_path, landing_email: {email: ""}
      end.to change{ LandingEmail.count }.by(0)
      expect(flash[:error]).to eq(["Email " + I18n.t('landing_email.errors.email_missing')])
    end

    it 'should only allow single registration' do
      LandingEmail.create(email: email)
      expect do
        post landing_email_subscribe_path, landing_email: {email: email}
      end.to change{ LandingEmail.count }.by(0)
      expect(flash[:error]).to eq(["Email " + I18n.t('landing_email.errors.already_registered')])
    end
  end
end
