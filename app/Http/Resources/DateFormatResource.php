<?php

namespace App\Http\Resources;

#use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class DateFormatResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		$date = $this->resource;
		$message = "Type already Carbon";

		if (gettype($date) != "object" || get_class(now()) != get_class($date)) {

			try {
				$date = Carbon::parse($this->resource);
				$message = "Generated To Carbon";
			} catch (\Exception $e) {
				$date = Carbon::parse("01.01.1999");
				$message = "Type doesnt correct";
			}
		}

		return [
			"diff_for_humans" => $date->diffForHumans(),
			"orginal" => $this->resource,
			"d_m_y" => $date->format('d.m.Y'),
			"Y_m_d" => $date->format('Y-m-d'),
			"d_m_y_h_i" => $date->format('d.m.Y H:i'),
			"message" => $message
		];
	}
}
