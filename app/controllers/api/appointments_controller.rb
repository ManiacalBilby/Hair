class Api::AppointmentsController < ApplicationController

def index
  @appointments = Appointment.where(stylist_id: params[:stylist_id])

  render json: @appointments
end

  def show
    @appointment = Appointment.where(stylist_id: params[:stylist_id]).find(params[:id])

    render json: @appointment
  end

  def create
    # @client = Client.first
    appointment_params_plus = appointment_params
    appointment_params_plus[:stylist_id] = params[:stylist_id]
    # appointment_params_plus[:client_id] = @client.id
    @appointment = Appointment.create!(appointment_params_plus)

    render json: @appointment
  end

  def update
    @appointment = Appointment.find(params[:id])
    @appointment.update! (appointment_params)

    render json: @appointment
  end

  # def destroy
  #   @appointment = Appointment.find(params[:id])
  #   @appointment.delete

  #   render status: :ok
  # end

  private

  def appointment_params
    params.require(:appointment).permit(
      :start_time, 
      :start_date,
      :duration,
      :comments,
      :client_id
)
  end
end
