<template>
	<Teleport to="body">
		<Transition name="modal" appear>
			<div
				id="modal"
				v-if="showModal"
				class="fixed inset-0 z-99 bg-white/30 backdrop-blur-xl overflow-y-auto"
				dusk="modal-container"
			>
				<div
					class="flex min-h-screen items-center justify-center p-0 lg:p-4 m-0"
					@click.self="() => allowBackDropClick ? closeModalHandle() : ''"
				>
					<Transition name="modal-content" appear>
						<div
							v-if="showModal"
							ref="modalRef"
							:class="{
								'md:w-[60%]': size === 'medium',
								'md:w-full': size === 'large',
								'md:w-[30%]': size === 'small',
								...strToClassObj(props.modalContentClass)
							}"
							class="w-screen xl:max-w-screen-xl m-auto transition-all duration-300"
						>
							<div class="bg-white shadow-xl rounded-2xl overflow-hidden">
								<div v-if="!hideHeader" class="relative px-6 py-4  border-b border-gray-200 bg-gradient-to-r from-white to-[#e3f2fd] border-rl-rad">
									<button
										v-if="!hideCrossButton"
										@click="closeModalHandle"
										class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full  hover:bg-white transition-all text-gray-500"
									>
										<i class="fas fa-times text-xl"></i>
									</button>
									
									<slot name="header">
										&lt;template v-slot:header&gt;
											[İÇERİK BURAYA]
										&lt;/template&gt;
									</slot>
								</div>

								<slot name="card-body" :closeModalHandle="closeModalHandle">
									<div class="p-6" :class="bodyClass" name="body-class">
										<slot name="body">
											<!-- <template v-slot:body>Body İçeriği</template> -->
											 &lt;template v-slot:body&gt;
													[İÇERİK BURAYA]
												&lt;/template&gt;
										</slot>
									</div>
								</slot>

								<div class="px-6 py-4 border-t flex justify-end gap-2" v-if="!hideFooter">
									
									<button
										v-if="!hideCancelButton"
										@click="() => { closeModalHandle() }"
										type="button"
										class="cancel-button"
									>
										{{ cancelButtonText }}
									</button>
									<slot name="footer" :closeModalHandle="closeModalHandle">
										<!-- <template #footer="{ closeModalHandle }"> ... </template> -->
									</slot>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch, nextTick, onMounted, onUnmounted } from 'vue'

const showModal = ref(true)
const modalRef = ref(null)

const emit = defineEmits(['close'])


const props = defineProps({
	allowBackDropClick: { type: Boolean, default: true },
	size: { type: String, default: 'medium' },
	hideCancelButton: { type: Boolean, default: false },
	hideCrossButton: { type: Boolean, default: false },
	bodyClass: { type: String },
	cancelButtonText: { type: String, default: 'Schließen' },
	hideHeader: { type: Boolean, default: false },
	hideFooter: { type: Boolean, default: false },
	name: { type: String, default: 'Modal' },
	modalContentClass: { type: String, default : ''}
});

defineOptions({
	name:  "Modal"
})

const strToClassObj = (cls) =>
	(cls || '')
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.reduce((acc, c) => ((acc[c] = true), acc), {})

function closeModalHandle() {
	showModal.value = false
	// Animasyon tamamlandıktan sonra emit et
	setTimeout(() => {
		emit('close')
	}, 300) // Animasyon süresi ile eşleşmeli
}

defineExpose({
	modalRef,
	closeModalHandle
})

onMounted(() => {
	document.getElementsByTagName("body")[0].classList.add("overflow-hidden")
})

onUnmounted(() => {
	document.getElementsByTagName("body")[0].classList.remove("overflow-hidden")
})

watch(() => showModal.value, (newValue) => {
	console.log("newValue", newValue)
		nextTick(() => {
			newValue
				? document.getElementsByTagName("body")[0].classList.add("overflow-hidden")
				: document.getElementsByTagName("body")[0].classList.remove("overflow-hidden")
		})
})
</script>

<style scoped>
/* Modal backdrop animasyonu */
.modal-enter-active,
.modal-leave-active {
	transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	backdrop-filter: blur(0px);
}

.modal-enter-to,
.modal-leave-from {
	opacity: 1;
	backdrop-filter: blur(12px);
}

/* Modal content animasyonu */
.modal-content-enter-active {
	transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-content-leave-active {
	transition: all 0.3s ease-in;
}

.modal-content-enter-from {
	opacity: 0;
	transform: scale(0.8) translateY(-50px);
}

.modal-content-leave-to {
	opacity: 0;
	transform: scale(0.95) translateY(20px);
}

.modal-content-enter-to,
.modal-content-leave-from {
	opacity: 1;
	transform: scale(1) translateY(0);
}

.cancel-button {
    background-color: white;
    border: 1px solid #e5e7eb;
    color: #4b5563;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.cancel-button:hover {
	background-color: #f9fafb;
	border-color: #f45151;
}
</style>