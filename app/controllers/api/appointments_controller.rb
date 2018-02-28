class Api::AppointmentsController < ApplicationController

def index
  @appointments = Appointment.where(stylist_id: params[:stylist_id])

  render json: @appointments
end

  # def show
  #   @appointment = Appointment.find(params[:id])

  #   render json: @appointment
  # end

  # def create
  #   @appointment = Appointment.create!(appointment_params)

  #   render json: @appointment
  # end

  # def update
  #   @appointment = Appointment.find(params[:id])
  #   @appointment.update! (appointment_params)

  #   render json: @appointment
  # end

  # def destroy
  #   @appointment = Appointment.find(params[:id])
  #   @appointment.delete

  #   render status: :ok
  # end

  # private

  # def appointment_params
  #   params.require(:appointment).permit(
  #     :start_, 
  #     :last_name,
  #     :photo_url,
  #     :email,
  #     :password)
  # end
end
